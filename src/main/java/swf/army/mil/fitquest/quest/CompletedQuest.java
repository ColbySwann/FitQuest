package swf.army.mil.fitquest.quest;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.specialEvent.SpecialEvent;
import swf.army.mil.fitquest.user.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "completed_quests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletedQuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "quest_id",nullable = false)
    private Quest quest;

    @ManyToOne
    @JoinColumn(name = "special_event_id", nullable = false)
    private SpecialEvent specialEvent;

    private LocalDateTime completedAt = LocalDateTime.now();
    private int xpEarned = 0;
    private int pointsEarned = 0;


}
