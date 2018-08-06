package com.wind.es6ajaxspringbootaopxss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;

import javax.servlet.MultipartConfigElement;

@SpringBootApplication
public class Es6AjaxSpringbootAopXssApplication {

    public static void main(String[] args) {
        SpringApplication.run(Es6AjaxSpringbootAopXssApplication.class, args);
    }

    /**
     * 上传文件配置
     * @return
     */
    @Bean
    public MultipartConfigElement multipartConfigElement(){

        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize("1000MB");
        return factory.createMultipartConfig();
    }
}
