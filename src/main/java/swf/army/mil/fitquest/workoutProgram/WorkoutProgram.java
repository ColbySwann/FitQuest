package swf.army.mil.fitquest.workoutProgram;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.programExercise.ProgramExercise;
import swf.army.mil.fitquest.user.User;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "workout_programs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String name;
    private String description;
    private int totalDuration = 0;
    private int estimatedCalories = 0;
    private int estimatedXp = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL)
    private List<ProgramExercise> exercises;


}
