package com.micro.documents.Repositories;


import com.micro.documents.Entities.Documents;
import com.micro.documents.Entities.Type;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface DocumentsRepository extends MongoRepository<Documents, Integer> {
    List<Documents> findByType(Type type);

}