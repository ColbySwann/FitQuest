package swf.army.mil.fitquest.weeklyChallenge;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "weekly_challenges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private int target = 0;
    private int xpReward = 0;
    private int pointsReward = 0;
    private String category;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean active = false;
    private String icon;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "weeklyChallenge", cascade = CascadeType.ALL)
    private List<UserWeeklyChallenge> userProgress;
}
