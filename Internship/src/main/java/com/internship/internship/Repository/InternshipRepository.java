package com.internship.internship.Repository;

import com.internship.internship.Entities.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository extends JpaRepository<Internship, Integer> {
}
