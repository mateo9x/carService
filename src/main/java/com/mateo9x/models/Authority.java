package com.mateo9x.models;

public enum Authority
{
    USER("USER");

    private final String authority;

    Authority(String authority)
    {
        this.authority = authority;
    }

    public String getAuthority()
    {
        return authority;
    }
}
