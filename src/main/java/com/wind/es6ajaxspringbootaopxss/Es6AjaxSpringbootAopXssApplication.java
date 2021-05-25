package com.wind.es6ajaxspringbootaopxss;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import net.lingala.zip4j.model.ZipParameters;
import net.lingala.zip4j.model.enums.AesKeyStrength;
import net.lingala.zip4j.model.enums.EncryptionMethod;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;

import javax.servlet.MultipartConfigElement;
import java.io.File;

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

        try {
            compressFile();
        } catch (ZipException e) {
            e.printStackTrace();
        }

        return factory.createMultipartConfig();
    }

    private void compressFile() throws ZipException {

        //String classPath = getClass().getResource("/").getPath().replaceFirst("/", "");

        /*for(String filename: new File(path).list()){
            System.out.println(filename);
        }
        return;*/

        ZipParameters zipParameters = new ZipParameters();
        zipParameters.setEncryptFiles(true);
        zipParameters.setEncryptionMethod(EncryptionMethod.AES);
        zipParameters.setAesKeyStrength(AesKeyStrength.KEY_STRENGTH_256);

        ZipFile zipFile = new ZipFile("webapp1.zip", "wind".toCharArray());
        zipFile.addFolder(new File("D://work//ES6-Ajax-SpringBoot-Aop-XSS//src//main//webapp//webapp1"), zipParameters);
    }
}
