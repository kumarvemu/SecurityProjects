package com.multicode.payments.control;

import com.multicode.payments.domain.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;
import java.time.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class HealthCheckController {

    @GetMapping("/health")
    public String systemIsHealthy() {
        return "ok";
    }

    @GetMapping("/errortest")
    public Object testingStatusCodes(HttpServletResponse response) {
        response.setStatus(406);
        return null;
    }
}
