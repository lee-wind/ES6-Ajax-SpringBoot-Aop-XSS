package com.wind.es6ajaxspringbootaopxss.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wind.es6ajaxspringbootaopxss.model.Skill;
import com.wind.es6ajaxspringbootaopxss.util.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class Index {

    private static final Logger logger = LoggerFactory.getLogger(Index.class);

    @RequestMapping("/")
    public String index(){

        return "<h1>Hello， Spring Boot!<h1>";
    }

    @GetMapping("/get")
    public Map<String, String> get(String name, String sex){

        Map<String, String> result = new HashMap<>();

        result.put("success", "getData成功");
        result.put("name", name);
        result.put("hobby", sex);

        return result;
    }

    @PostMapping("/postData")
    public Map<String, Object> postData(String name, String[] hobby){

        Map<String, Object> result = new HashMap<>();

        result.put("success", "postData成功");
        result.put("name", name);
        result.put("hobby", hobby);

        return result;
    }

    @PostMapping("/postJSON")
    public Map<String, Object> postJSON(@RequestBody() Map<String, Object> person) throws IOException {

        Map<String, Object> result = new HashMap<>();

        //JSON字符串转bean
        Skill skill = new ObjectMapper().readValue(JSONUtil.toJSONString(person.get("skill")), Skill.class);

        logger.info("skill：{}",JSONUtil.toJSONString(skill));

        result.put("postJSON成功:", JSONUtil.toJSONString(skill));

        return person;
    }

    @PostMapping("/postJSONByObject")
    public List<Skill> postJSONByObject(@RequestBody() List<Skill> skill) throws IOException {

        logger.info("skill：{}",JSONUtil.toJSONString(skill));

        return skill;
    }

    @PostMapping("/postFormData")
    public Map<String, String> postFormData(String name, @RequestPart Part file){

        Map<String, String> result = new HashMap<>();

        logger.info("name: {}, 文件名: {}", name, file.getSubmittedFileName());

        try {
            file.write("E:/Java"  + file.getSubmittedFileName());
        } catch (IOException e) {
            e.printStackTrace();
        }

        result.put("success", "postFormData成功");

        return result;
    }
}
