import static org.junit.Assert.*;
import org.junit.Test;
import codeFiles.sampleCode;

public class sampleCodeTest {

    @Test
    public void testIsPrime() {
        assertEquals("3 is prime number", sampleCode.main(new String[]{"3"}));
    }

    @Test
    public void testIsNotPrime() {
        assertEquals("4 is not prime number", sampleCode.main(new String[]{"4"}));
    }
}