package tn.esprit.piproject.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tn.esprit.piproject.Entities.*;
import tn.esprit.piproject.Repositories.*;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final CompanyRepository companyRepository;

    private final OffreRepository offreRepository;
    private final TaskRepository taskRepository;

    public DatabaseInitializer(
                               CompanyRepository companyRepository,


            OffreRepository offreRepository,TaskRepository taskRepository) {

        this.companyRepository = companyRepository;

        this.offreRepository=offreRepository;

        this.taskRepository=taskRepository;
    }

    @Override
    public void run(String... args) {

        if (companyRepository.count() == 0) {
            Company company = new Company();
            companyRepository.save(company);
        }



        if (offreRepository.count() == 0) {
            Offer offre = new Offer();
            offreRepository.save(offre);
        }


        if (taskRepository.count() == 0) {
            Task task = new Task();
            taskRepository.save(task);
        }
    }
}