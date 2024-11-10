package tn.esprit.piproject.Services;

import tn.esprit.piproject.Entities.*;

import java.util.List;
import java.util.Optional;

public interface IProjectService {
    List<Task> getAllTasks();
    Optional<Task> getTaskById(int id);
    Task createTask(Task task);
    Task updateTask(Task task);
    void deleteTask(int id);
    /*****************************************/
    List<Offer> getAllOffer();

    Optional<Offer> getofferById(int id);
    List<Offer> getoffersByCompany(int id);

    Offer createoffer(Offer offer);

    Offer updateoffer(Offer offer);

    void deleteoffer(int id);
    /***************************************/
    List<Company> getAllcompany();

    Optional<Company> getCompanyById(int idComp);

    Company createcompany(Company company);

    Company updatecompany(Company company);

    void deletecompany(int idComp);
    /***************************************/
}
