package com.mateo9x.services;

import com.mateo9x.exceptions.ReportException;
import com.mateo9x.models.ReportData;
import com.spire.xls.FileFormat;
import com.spire.xls.Workbook;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@AllArgsConstructor
public class ReportService {
    public File generateXlsxReport(Map<String, ReportData> reportDataMap) {
        try {
            File file = new File("temp.xlsx");
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Raport");
            AtomicInteger rowNum = new AtomicInteger();
            for (int i = 0; i < reportDataMap.keySet().size(); i++) {
                String key = reportDataMap.keySet().stream().toList().get(i);
                ReportData reportData = reportDataMap.get(key);
                if (i > 0) {
                    rowNum.incrementAndGet();
                    rowNum.incrementAndGet();
                }
                writeSection(workbook, sheet, key, rowNum);
                writeHeader(workbook, sheet, reportData.getData().keySet(), rowNum);
                writeData(sheet, reportData.getData(), rowNum);
                autoSizeColumns(sheet, reportData.getData().keySet().size());
            }

            FileOutputStream outputStream = new FileOutputStream(file);
            workbook.write(outputStream);
            workbook.close();

            return file;
        } catch (IOException e) {
            log.error("Failed to generate xlsx report: {} {}", e, e.getMessage());
            throw new ReportException("Failed to generate xlsx report");
        }
    }

    public File generatePdfReport(Map<String, ReportData> reportDataMap) {
        try {
            File returnFile = new File("temp.pdf");
            File file = generateXlsxReport(reportDataMap);
            Workbook workbook = new Workbook();
            workbook.loadFromStream(new FileInputStream(file));
            workbook.getConverterSetting().setSheetFitToPage(true);
            workbook.saveToFile(returnFile.getName(), FileFormat.PDF);
            return returnFile;
        } catch (IOException e) {
            log.error("Failed to generate pdf report: {} {}", e, e.getMessage());
            throw new ReportException("Failed to generate pdf report");
        }
    }

    private void autoSizeColumns(XSSFSheet sheet, int columns) {
        for (int i = 0; i < columns; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void writeData(XSSFSheet sheet, Map<String, List<Object>> data, AtomicInteger rowNumAtomic) {
        int headerRowNum = rowNumAtomic.get();
        for (int colNum = 0; colNum < data.entrySet().size(); colNum++) {
            Map.Entry<String, List<Object>> colEntry = data.entrySet().stream().toList().get(colNum);
            rowNumAtomic.set(headerRowNum);
            for (int rowNum = 0; rowNum < colEntry.getValue().size(); rowNum++) {
                if (rowNum == 0) {
                    rowNumAtomic.addAndGet(rowNum + 1);
                } else {
                    rowNumAtomic.addAndGet(rowNum);
                }

                Row row = sheet.getRow(rowNumAtomic.get());
                if (row == null) {
                    row = sheet.createRow(rowNumAtomic.get());
                }
                Object valueToSave = colEntry.getValue().get(rowNum);
                writeCell(row, valueToSave, colNum, null);
            }
        }
    }

    private void writeCell(Row row, Object value, int colNum, CellStyle cellStyle) {
        Cell cell = row.createCell(colNum);
        if (cellStyle != null) {
            cell.setCellStyle(cellStyle);
        }
        if (value instanceof String) {
            cell.setCellValue((String) value);
        } else if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Long) {
            cell.setCellValue((Long) value);
        } else if (value instanceof Double) {
            cell.setCellValue((Double) value);
        } else if (value instanceof LocalDate localDate) {
            cell.setCellValue(localDate.toString());
        } else if (value != null) {
            log.error("Unexpected cell value type {}", value.getClass());
        } else {
            cell.setCellValue("-");
        }
    }

    private void writeSection(XSSFWorkbook workbook, XSSFSheet sheet, String value, AtomicInteger rowNum) {
        Row row = sheet.createRow(rowNum.get());
        row.setHeight((short) -1);
        CellStyle cellStyle = getHeaderCellStyle(workbook);
        writeCell(row, value, 0, cellStyle);
        rowNum.incrementAndGet();
        rowNum.incrementAndGet();
    }

    private void writeHeader(XSSFWorkbook workbook, XSSFSheet sheet, Set<String> headers, AtomicInteger rowNum) {
        List<String> headersList = headers.stream().toList();
        Row row = sheet.createRow(rowNum.incrementAndGet());
        row.setHeight((short) -1);
        CellStyle cellStyle = getHeaderCellStyle(workbook);
        for (int colNum = 0; colNum < headersList.size(); colNum++) {
            writeCell(row, headersList.get(colNum), colNum, cellStyle);
        }
    }

    private CellStyle getHeaderCellStyle(XSSFWorkbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(font);
        cellStyle.setWrapText(true);
        return cellStyle;
    }
}
