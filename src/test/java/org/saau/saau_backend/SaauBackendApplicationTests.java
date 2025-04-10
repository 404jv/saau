package org.saau.saau_backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.boot.test.web.client.TestRestTemplate;
import static org.junit.jupiter.api.Assertions.*;

record UserDTO(String id, String name, String email, String password) {}

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class SaauBackendApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	void contextLoads() {
		UserDTO request = new UserDTO("1", "John", "john@example.com", "password");

		var response = restTemplate.postForEntity("/user", request, UserDTO.class);
		UserDTO body = response.getBody();

		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertNotNull(body);
		assertEquals("1", body.id());
		assertEquals("John", body.name());
		assertEquals("john@example.com", body.email());
	}
}
