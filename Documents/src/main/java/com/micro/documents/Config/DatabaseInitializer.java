package com.micro.documents.Config;

import com.micro.documents.Entities.*;
import com.micro.documents.Repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {
    private final DocumentsRepository documentsRepository;
    public DatabaseInitializer(
                               DocumentsRepository documentsRepository
    ) {
        this.documentsRepository=documentsRepository;
    }

    @Override
    public void run(String... args) {

        if (documentsRepository.count() == 0) {
            Documents document = new Documents();
            documentsRepository.save(document);
        }
    }
}