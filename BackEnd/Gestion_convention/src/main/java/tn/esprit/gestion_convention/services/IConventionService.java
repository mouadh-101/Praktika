package tn.esprit.gestion_convention.services;

import tn.esprit.gestion_convention.entities.Convention;

import java.util.Date;
import java.util.List;

public interface IConventionService {

    List<Convention> getAllConventions();
    Convention getConventionById(Integer id);
    Convention saveConvention(Convention convention);
    void deleteConvention(Integer id);
    Convention updateConvention(Convention convention);
    

    Convention affecterTerm(Integer id, Integer idTerm);

    List<Convention> filterConventionsByDate(Date startDate, Date endDate);
    // Méthode pour récupérer le nombre de conventions dans une période donnée
    // Méthode pour obtenir le nombre de conventions par mois et année
    Long countConventionsByMonthAndYear(int month, int year);
}
