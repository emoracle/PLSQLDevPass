using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace PLSQLDevPass
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("PL/SQL Developer: Password 'Decrypter'");
            Console.WriteLine("  Copyright 2016 Adam Caudill & Brandon Wilson");
            Console.WriteLine("  v{0} - https://github.com/adamcaudill/PLSQLDevPass", Assembly.GetExecutingAssembly().GetName().Version);
            Console.WriteLine();

            try
            {
                _PrintResults(args);

                Console.WriteLine("Done.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private static void _PrintResults(string[] args)
        {
            string search;
            if (args.Length == 0)
            {
                search = @"C:\";
            }
            else
            {
                search = $@"\\{args[0]}\c$\";
            }

            var paths = _GetPaths(search);

            Console.WriteLine("Found {0} config files...", paths.Count);

            foreach (var path in paths)
            {
                var settings = new Settings(path);

                try
                {
                    var logins = settings.GetLogins();
                    foreach (var login in logins)
                    {
                        Console.WriteLine("Result! '{0}'", login);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error! '{0}'", ex.Message);
                }
            }
        }

        private static List<string> _GetPaths(string search)
        {
            const string FILE_NAME = "user.prefs";
            const string USER_PATH = @"AppData\Roaming\PLSQL Developer\Preferences";
            const string PROGRAMS_PATH = @"Program Files\PLSQL Developer\Preferences";
            const string PROGRAMS_86_PATH = @"Program Files (x86)\PLSQL Developer\Preferences";

            var ret = new List<string>();

            //search "Users"
            _SearchPaths(Path.Combine(search, "Users"), USER_PATH, FILE_NAME, ret);

            //search "Program Files"
            _SearchPaths(Path.Combine(search, PROGRAMS_PATH), null, FILE_NAME, ret);

            //search "Program Files (x86)"
            _SearchPaths(Path.Combine(search, PROGRAMS_86_PATH), null, FILE_NAME, ret);

            return ret;
        }

        private static void _SearchPaths(string search, string relativePath, string fineName, List<string> ret)
        {
            if (Directory.Exists(search))
            {
                try
                {
                    foreach (var path in Directory.GetDirectories(search))
                    {
                        if (relativePath != null && Directory.Exists(Path.Combine(path, relativePath)))
                        {
                            foreach (var userPath in Directory.GetDirectories(Path.Combine(path, relativePath)))
                            {
                                var file = Path.Combine(userPath, fineName);
                                if (File.Exists(file))
                                {
                                    ret.Add(file);
                                }
                            }
                        }
                        else
                        {
                            var file = Path.Combine(path, fineName);
                            if (File.Exists(file))
                            {
                                ret.Add(file);
                            }
                        }
                    }
                }
                catch (UnauthorizedAccessException)
                {
                    //gooble gooble
                }
            }
        }
    }
}
