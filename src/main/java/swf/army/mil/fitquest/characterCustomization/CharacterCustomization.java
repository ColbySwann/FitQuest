package swf.army.mil.fitquest.characterCustomization;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.user.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "character_customization")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharacterCustomization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String name;
    private String characterClass;
    private String avatar;
    private String color;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();




}
