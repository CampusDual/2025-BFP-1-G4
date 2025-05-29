package com.campusdual.bfp;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationTests {

	@Test
	void contextLoads() {
		int actual = 1;
		Assertions.assertEquals(1, actual);
	}

}
