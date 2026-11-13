package com.blooddonation.smart.repository;
import com.blooddonation.smart.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface DonorRepository extends MongoRepository<Donor,String> {
    List<Donor> findByBloodGroupIgnoreCaseAndCityContainingIgnoreCaseAndAvailableTrue(String bloodGroup, String city);
    List<Donor> findByCityContainingIgnoreCaseAndAvailableTrue(String city);
    List<Donor> findByBloodGroupIgnoreCaseAndAvailableTrue(String bloodGroup);
    List<Donor> findByAvailableTrue();
}
