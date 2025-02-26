package tn.esprit.gestion_convention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.gestion_convention.entities.Convention;
import tn.esprit.gestion_convention.entities.Terms;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface IConventionRepo extends JpaRepository<Convention, Integer>, JpaSpecificationExecutor<Convention> {

    // Requête pour compter le nombre de conventions par mois et année
    @Query("SELECT COUNT(c) FROM Convention c " +
            "WHERE MONTH(c.DateConv) = :month AND YEAR(c.DateConv) = :year")
    Long countConventionsByMonthAndYear(int month, int year);
}
