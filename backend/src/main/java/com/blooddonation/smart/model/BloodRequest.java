package com.blooddonation.smart.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "blood_requests")
public class BloodRequest {
    @Id private String id;
    private String patientName;
    private String bloodGroup;
    private String city;
    private String hospital;
    private String contact;
    private String status = "OPEN";
    private LocalDateTime createdAt = LocalDateTime.now();

    public BloodRequest() {}
    public String getId(){return id;} public void setId(String v){id=v;}
    public String getPatientName(){return patientName;} public void setPatientName(String v){patientName=v;}
    public String getBloodGroup(){return bloodGroup;} public void setBloodGroup(String v){bloodGroup=v;}
    public String getCity(){return city;} public void setCity(String v){city=v;}
    public String getHospital(){return hospital;} public void setHospital(String v){hospital=v;}
    public String getContact(){return contact;} public void setContact(String v){contact=v;}
    public String getStatus(){return status;} public void setStatus(String v){status=v;}
    public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime v){createdAt=v;}
}
