package com.micro.documents.Services;

import com.micro.documents.Entities.Documents;
import com.micro.documents.Entities.Type;
import com.micro.documents.Repositories.DocumentsRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class IProjectImp implements IProjectService {


    @Autowired
    private DocumentsRepository documentsRepository;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    @Autowired
    private MongoTemplate mongoTemplate;
    private Set<String> stopWords = new HashSet<>();


    /****************************************************************/
    @Override
    public List<Documents> getAlldocuments() {
        return documentsRepository.findAll();
    }

    @Override
    public Optional<Documents> getdocumentsById(int id) {
        return documentsRepository.findById(id);
    }



    @Override
    public Documents createdocuments(Documents documents, byte[] fileContent) {
        documents.setIdDoc(sequenceGeneratorService.generateSequence("documents_sequence"));
        documents.setContent(new Binary(fileContent)); // Set content as Binary
        return documentsRepository.save(documents);
    }



    @Override
    public List<Documents> getDocumentsByType(Type type) {
        return documentsRepository.findByType(type);
    }

    @Override
    public Documents updatedocuments(Documents documents) {
        return documentsRepository.save(documents);
    }

    @Override
    public void deletedocuments(int id) {
        documentsRepository.deleteById(id);
    }

    /********************************************************************************/
}