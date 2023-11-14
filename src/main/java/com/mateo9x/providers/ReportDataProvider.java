package com.mateo9x.providers;

import com.mateo9x.enums.ReportRange;
import com.mateo9x.models.ReportData;
import com.mateo9x.models.ReportDataRequest;

public interface ReportDataProvider {

    boolean supports(ReportRange reportRange);

    ReportData prepareData(ReportDataRequest reportDataRequest);
}
