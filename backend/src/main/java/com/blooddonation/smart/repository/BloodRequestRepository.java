package com.blooddonation.smart.repository;
import com.blooddonation.smart.model.BloodRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface BloodRequestRepository extends MongoRepository<BloodRequest,String> {
    List<BloodRequest> findAllByOrderByCreatedAtDesc();
}
