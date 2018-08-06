package com.wind.es6ajaxspringbootaopxss.aop;

import com.wind.es6ajaxspringbootaopxss.util.JSONUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@Aspect
@Component
public class ControllerAop {

    private static final Logger logger = LoggerFactory.getLogger(ControllerAop.class);

    @Pointcut("within(com.wind.es6ajaxspringbootaopxss.controller..*)")
    public void pointcut(){

    }

    /**
     * 打印通过form表单形式传递的参数
     * @param joinPoint
     */
    @Before("pointcut()")
    public void logRequestParams(JoinPoint joinPoint){

        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();

        Enumeration requestParams = request.getParameterNames();

        logger.info("调用方法：{}，请求参数：",joinPoint.getSignature().toShortString());

        while(requestParams.hasMoreElements()){
            String paramName = (String)requestParams.nextElement();
            String[] paramValues = request.getParameterValues(paramName);
            if(paramValues.length == 1){
                String paramValue = paramValues[0];
                logger.info("{}：{}",paramName, paramValue);
            }else{
                logger.info("{}: {}", paramName, JSONUtil.toJSONString(paramValues));
            }
        }
    }

    /**
     * 打印返回值
     * @param joinPoint
     * @param result
     */
    @AfterReturning(pointcut = "pointcut()", returning = "result")
    public void logResponseValue(JoinPoint joinPoint, Object result){

        logger.info("调用方法：{}，返回结果：{}",joinPoint.getSignature().toShortString(),
                JSONUtil.toJSONString(result));
    }
}
