package com.micro.documents.Entities;

import jakarta.validation.constraints.NotNull;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Document(collection = "Documents")
public class Documents {
    @Id
    private int idDoc;

    @NotNull
    private Type type;

    @Field("description")
    private String description;
    private Binary content;



    @Field("isPlagiarized")
    private boolean isPlagiarized;

    private List<String> plagiarizedLines;


}
