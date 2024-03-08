using NUnit.Framework;
using System;

namespace check1.Tests
{
    [TestFixture]
    public class ProgramTests
    {
        [Test]
        public void TestEvenNumber()
        {
            int number = 4;
            string expected = "Entered Number is an Even Number";
            using (var consoleOutput = new ConsoleOutput())
            {
                Program.Main(new string[] { number.ToString() });
                Assert.AreEqual(expected, consoleOutput.GetOuput());
            }
        }

        [Test]
        public void TestOddNumber()
        {
            int number = 5;
            string expected = "Entered Number is an Odd Number";
            using (var consoleOutput = new ConsoleOutput())
            {
                Program.Main(new string[] { number.ToString() });
                Assert.AreEqual(expected, consoleOutput.GetOuput());
            }
        }
    }

    public class ConsoleOutput : IDisposable
    {
        private StringWriter stringWriter;
        private TextWriter originalOutput;

        public ConsoleOutput()
        {
            stringWriter = new StringWriter();
            originalOutput = Console.Out;
            Console.SetOut(stringWriter);
        }

        public string GetOuput()
        {
            return stringWriter.ToString().Trim();
        }

        public void Dispose()
        {
            Console.SetOut(originalOutput);
            stringWriter.Dispose();
        }
    }
}