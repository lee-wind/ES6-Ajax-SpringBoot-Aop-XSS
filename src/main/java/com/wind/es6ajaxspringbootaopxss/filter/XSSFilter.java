package com.wind.es6ajaxspringbootaopxss.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.HtmlUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.IOException;

@WebFilter(filterName = "XSSFilter", urlPatterns = "/*")
public class XSSFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(XSSFilter.class);

    public void destroy() {

        logger.info("跨站脚本攻击过滤器销毁！");
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {

        XSSHttpServletRequestWrapper xssHttpServletRequestWrapper = new XSSHttpServletRequestWrapper((HttpServletRequest) req);
        chain.doFilter(xssHttpServletRequestWrapper, resp);
    }

    public void init(FilterConfig config) throws ServletException {

        logger.info("跨站脚本攻击过滤器开启！");
    }

    class XSSHttpServletRequestWrapper extends HttpServletRequestWrapper {

        XSSHttpServletRequestWrapper(HttpServletRequest request){

            super(request);
        }

        @Override
        public String getParameter(String name){

            String value = super.getParameter(name);
            return HtmlUtils.htmlEscape(value);
        }

        @Override
        public String[] getParameterValues(String name){

            String[] values = super.getParameterValues(name);
            if(values != null){
                int length = values.length;
                String[] escapeValues = new String[length];
                for(int i=0; i<length; i++){
                    escapeValues[i] = HtmlUtils.htmlEscape(values[i]);
                }
                return escapeValues;
            }
            return super.getParameterValues(name);
        }
    }
}
