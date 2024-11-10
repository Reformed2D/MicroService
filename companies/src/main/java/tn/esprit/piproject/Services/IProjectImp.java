package tn.esprit.piproject.Services;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tn.esprit.piproject.Entities.*;
import tn.esprit.piproject.Repositories.*;

import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class IProjectImp implements IProjectService {


    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private OffreRepository offerRepository;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    @Autowired
    private CompanyRepository companyRepository;


    @Override
    public List<Task> getAllTasks() {return taskRepository.findAll();}

    @Override
    public Optional<Task> getTaskById(int id) {return taskRepository.findById(id);}

    @Override
    public Task createTask(Task task) {
        task.setId(sequenceGeneratorService.generateSequence("documents_sequence"));
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Offer> getAllOffer() {
        return offerRepository.findAll();
    }


    @Override
    public Optional<Offer> getofferById(int id) {
        return offerRepository.findById(id);
    }

    public List<Offer> getoffersByCompany(int id) {
        List<Offer> all_offers = offerRepository.findAll();
        return all_offers.stream()
                .filter(offer -> offer.getCompany().getId() == id)
                .collect(Collectors.toList());
    }

    @Override
    public Offer createoffer(Offer offer) {
        offer.setId(sequenceGeneratorService.generateSequence("documents_sequence"));
        Date currentDate = Date.from(Instant.now());
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, 3);
        Date date_after_3_days = (Date) c.getTime();
        offer.setDateStart(currentDate);
        offer.setDateEnd(date_after_3_days);
        Company company_from_db=companyRepository.findById(offer.getCompany().getId()).orElseGet(null);
        if(company_from_db == null) return Offer.Empty();
        company_from_db.getOffers().add(offer);
        companyRepository.save(company_from_db);
        return offerRepository.save(offer);
    }

    @Override
    public Offer updateoffer(Offer offer) {
        Company company_from_db=companyRepository.findById(offer.getCompany().getId()).orElseGet(null);
        if(company_from_db == null) return Offer.Empty();
        company_from_db.getOffers().add(offer);
        companyRepository.save(company_from_db);
        return offerRepository.save(offer);
    }

    @Override
    public void deleteoffer(int id) {
        offerRepository.findById(id).ifPresent(offer_value -> {
            companyRepository.findById(offer_value.getCompany().getId()).ifPresent(company_value -> {
                company_value.getOffers().remove(offer_value);
                companyRepository.save(company_value);
            });
            offerRepository.deleteById(offer_value.getId());
        });
    }

    @Override
    public List<Company> getAllcompany() {
        return companyRepository.findAll();
    }

    @Override
    public Optional<Company> getCompanyById(int idComp) {
        return companyRepository.findById(idComp);
    }

    @Override
    public Company createcompany(Company company) {
        company.setId(sequenceGeneratorService.generateSequence("documents_sequence"));
        return companyRepository.save(company);
    }


    @Override
    public Company updatecompany(Company company) {return companyRepository.save(company);
    }

    @Override
    public void deletecompany(int idComp) {
        companyRepository.deleteById(idComp);
    }

    /***************************************************/
    /*
    @Override
    public List<Documents> getAllDocuments() {
        return documentsRepository.findAll();
    }

    @Override
    public Optional<Documents> getDocumentsById(int id) {
        return DocumentsRepository.findById(id);
    }

    @Override
    public User createDocument(Documents documents) {
        return documentsRepository.save(documents);
    }

    @Override
    public User updateDocuments(Documents documents) {
        return userRepository.save(documents);
    }

    @Override
    public void deleteDocuments(int id) {
        documentsRepository.deleteById(id);
    }*/
}