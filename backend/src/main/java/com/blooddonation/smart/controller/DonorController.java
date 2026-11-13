package com.blooddonation.smart.controller;

import com.blooddonation.smart.model.Donor;
import com.blooddonation.smart.repository.DonorRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {
    private final DonorRepository donors;
    public DonorController(DonorRepository donors) { this.donors=donors; }

    @GetMapping public List<Donor> all() { return donors.findByAvailableTrue(); }

    @GetMapping("/search")
    public List<Donor> search(@RequestParam(required=false) String bloodGroup,
                              @RequestParam(required=false) String city) {
        String bg = bloodGroup == null ? "" : bloodGroup.trim();
        String c = city == null ? "" : city.trim();
        if (!bg.isEmpty() && !c.isEmpty()) return donors.findByBloodGroupIgnoreCaseAndCityContainingIgnoreCaseAndAvailableTrue(bg,c);
        if (!bg.isEmpty()) return donors.findByBloodGroupIgnoreCaseAndAvailableTrue(bg);
        if (!c.isEmpty()) return donors.findByCityContainingIgnoreCaseAndAvailableTrue(c);
        return donors.findByAvailableTrue();
    }

    @PostMapping public Donor create(@RequestBody Donor donor) { return donors.save(donor); }
    @PutMapping("/{id}") public Donor update(@PathVariable String id, @RequestBody Donor donor) {
        donor.setId(id); return donors.save(donor);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable String id) { donors.deleteById(id); }
}
