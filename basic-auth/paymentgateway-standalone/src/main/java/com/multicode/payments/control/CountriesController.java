package com.multicode.payments.control;

import com.multicode.payments.domain.CreditCardTransaction;
import com.multicode.payments.service.CCUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountriesController {

    @Autowired
    CCUtilsService service;

    @GetMapping
    public List<String> getAll() {
        return service.getAllCountries();
    }
}
