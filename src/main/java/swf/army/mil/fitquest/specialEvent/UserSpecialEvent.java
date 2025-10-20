package swf.army.mil.fitquest.specialEvent;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.user.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_special_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSpecialEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "special_event_id", nullable = false)
    private SpecialEvent specialEvent;

    private LocalDateTime joinedAt = LocalDateTime.now();


}
