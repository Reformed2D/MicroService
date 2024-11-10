package microservice.defence_service.Services;

import microservice.defence_service.Entity.Defence;

import java.util.Date;
import java.util.List;

public interface DefenceService {
    List<Defence> getAllDefences();
    Defence getDefenceById(int id);
    Defence createDefence(Defence defence);
    Defence updateDefence(int id, Defence defence);
    void deleteDefence(int id);
    List<Date> getUsedDates();

}