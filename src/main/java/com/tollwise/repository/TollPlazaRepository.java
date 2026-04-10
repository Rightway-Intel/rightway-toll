package com.tollwise.repository;
import com.tollwise.entity.TollPlaza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface TollPlazaRepository extends JpaRepository<TollPlaza, Long> {
    List<TollPlaza> findByState(String state);
    List<TollPlaza> findByPlazaNameContainingIgnoreCase(String name);
    @Query("SELECT t FROM TollPlaza t WHERE t.latitude BETWEEN :latMin AND :latMax AND t.longitude BETWEEN :lonMin AND :lonMax")
    List<TollPlaza> findByBoundingBox(@Param("latMin") Double latMin, @Param("latMax") Double latMax, @Param("lonMin") Double lonMin, @Param("lonMax") Double lonMax);
}