package com.blooddonation.smart.controller;

import com.blooddonation.smart.model.BloodRequest;
import com.blooddonation.smart.repository.BloodRequestRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class BloodRequestController {
    private final BloodRequestRepository requests;
    public BloodRequestController(BloodRequestRepository requests) { this.requests=requests; }
    @GetMapping public List<BloodRequest> all() { return requests.findAllByOrderByCreatedAtDesc(); }
    @PostMapping public BloodRequest create(@RequestBody BloodRequest request) { return requests.save(request); }
}
