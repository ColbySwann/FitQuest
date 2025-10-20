package swf.army.mil.fitquest.specialEvent;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.quest.CompletedQuest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "special_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String theme;
    private LocalDate startDate;
    private LocalDate endDate;

    private double xpMultiplier = 1.0;
    private double pointsMultiplier = 1.0;

    private String specialReward;
    private boolean active = false;
    private String icon;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "specialEvent", cascade = CascadeType.ALL)
    private List<CompletedQuest> completedQuests;

}
