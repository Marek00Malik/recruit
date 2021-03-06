package com.code.house.recruit.common.nosql.repos;


import com.code.house.recruit.common.nosql.documents.User;
import org.assertj.core.util.Lists;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.CollectionOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import static com.code.house.recruit.common.nosql.documents.User.builder;
import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@RunWith(SpringRunner.class)
public class UserRepoTest {
    @Autowired
    private MongoTemplate template;

    @Autowired
    private UserRepo repo;

    @Before
    public void setUp() {
        if (template.collectionExists(User.class)) {
            template.dropCollection(User.class);
        }
        template.createCollection(User.class, CollectionOptions.empty().size(1024 * 1024).maxDocuments(100).capped());

        repo.saveAll(
                Lists.newArrayList(builder()
                                .email("info@code-house.pl")
                                .firstName("Mms")
                                .lastName("YouKnowWho")
                                .status(User.Status.ACTIVE)
                                .build(),
                        builder()
                                .email("Aga@poczta.pl")
                                .firstName("Aga")
                                .lastName("Konopka")
                                .status(User.Status.ACTIVE)
                                .build()));

    }

    @Test
    public void test1() {
        assertThat(repo.count()).isEqualTo(2);
    }


    @Test
    public void shouldSuccessfullyFindUserByEmail(){
        assertThat(repo.findByEmail("info@code-house.pl")).isNotNull();
    }
}
