package com.micro.documents.Services;

import com.micro.documents.Entities.Documents;
import com.micro.documents.Entities.Type;

import java.util.List;
import java.util.Optional;

public interface IProjectService {
    /******Tasks*****/

    /*******USER*********/
    /***********************OMAR******************************/
    /***************************OMAR****************************/
    List<Documents> getAlldocuments();

    Optional<Documents> getdocumentsById(int id);

    Documents createdocuments(Documents documents, byte[] fileContent);


    Documents updatedocuments(Documents documents);

    void deletedocuments(int id);

    List<Documents> getDocumentsByType(Type type);

    /********************************************/

}

