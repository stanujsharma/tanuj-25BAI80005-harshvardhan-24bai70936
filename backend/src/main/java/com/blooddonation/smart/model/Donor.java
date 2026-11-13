package com.blooddonation.smart.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donors")
public class Donor {
    @Id private String id;
    private String fullName;
    private String bloodGroup;
    private String city;
    private String phone;
    private int age;
    private boolean available = true;

    public Donor() {}
    public Donor(String fullName, String bloodGroup, String city, String phone, int age) {
        this.fullName=fullName; this.bloodGroup=bloodGroup; this.city=city; this.phone=phone; this.age=age;
    }
    public String getId(){return id;} public void setId(String v){id=v;}
    public String getFullName(){return fullName;} public void setFullName(String v){fullName=v;}
    public String getBloodGroup(){return bloodGroup;} public void setBloodGroup(String v){bloodGroup=v;}
    public String getCity(){return city;} public void setCity(String v){city=v;}
    public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
    public int getAge(){return age;} public void setAge(int v){age=v;}
    public boolean isAvailable(){return available;} public void setAvailable(boolean v){available=v;}
}
