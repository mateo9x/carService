package com.mateo9x.authentication;

import com.mateo9x.entities.User;
import com.mateo9x.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Repository
public class CarServiceUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public AuthenticatedUser loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            return new AuthenticatedUser(user.getId(), user.getEmail(), user.getPassword(), getRoles(user.getRoles()));
        }
        throw new UsernameNotFoundException("Użytkownik nie znaleziony!");
    }

    private Collection<? extends GrantedAuthority> getRoles(String roles) {
        return Arrays.stream(roles.split(";")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }
}
