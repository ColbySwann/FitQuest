package swf.army.mil.fitquest.weeklyChallenge;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.user.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_weekly_challenges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWeeklyChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "weekly_challenge_id", nullable = false)
    private WeeklyChallenge weeklyChallenge;

    private int currentProgress = 0;
    private boolean completed = false;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
