package swf.army.mil.fitquest.CompletedExercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.completedWorkout.CompletedWorkout;
import swf.army.mil.fitquest.exercise.Exercise;

@Entity
@Table(name = "completed_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletedExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "completed_workout_id", nullable = false)
    private CompletedWorkout completedWorkout;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    private  int setsCompleted = 0;
    private int repsCompleted = 0;
    private int duration = 0;


}
