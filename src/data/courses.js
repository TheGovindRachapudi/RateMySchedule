export const courses = [
  {
    id: "SDS301",
    dept: "SDS",
    number: "301",
    title: "Introduction to Data Science",
    credits: 3,
    sections: [
      { unique: 56110, instructor: "Caroline Waring", days: "MWF", start: "09:00", end: "10:00", building: "GDC", room: "4.302", seats: 150, enrolled: 118, rating: 4.5, mode: "In Person" },
      { unique: 56115, instructor: "Layla Parast", days: "TTH", start: "11:00", end: "12:30", building: "SEA", room: "1.116", seats: 80, enrolled: 72, rating: 4.7, mode: "In Person" }
    ]
  },
  {
    id: "SDS322",
    dept: "SDS",
    number: "322",
    title: "Scientific Programming",
    credits: 3,
    sections: [
      { unique: 56830, instructor: "Layla Parast", days: "TTH", start: "09:30", end: "11:00", building: "GDC", room: "2.216", seats: 72, enrolled: 66, rating: 4.8, mode: "In Person" },
      { unique: 56835, instructor: "Alyssa Flores", days: "MWF", start: "11:00", end: "12:00", building: "RLM", room: "6.104", seats: 90, enrolled: 63, rating: 4.2, mode: "In Person" },
      { unique: 56840, instructor: "Staff", days: "TTH", start: "14:00", end: "15:30", building: "BUR", room: "106", seats: 120, enrolled: 58, rating: 3.6, mode: "In Person" }
    ]
  },
  {
    id: "SDS328M",
    dept: "SDS",
    number: "328M",
    title: "Mathematical Statistics",
    credits: 3,
    sections: [
      { unique: 56850, instructor: "Matthew Stephens", days: "MWF", start: "10:00", end: "11:00", building: "WEL", room: "2.302", seats: 70, enrolled: 65, rating: 4.3, mode: "In Person" },
      { unique: 56855, instructor: "Taylor White", days: "TTH", start: "12:30", end: "14:00", building: "RLM", room: "7.122", seats: 65, enrolled: 44, rating: 4.0, mode: "In Person" }
    ]
  },
  {
    id: "SDS375",
    dept: "SDS",
    number: "375",
    title: "Data Visualization",
    credits: 3,
    sections: [
      { unique: 56900, instructor: "Claus Wilke", days: "TTH", start: "11:00", end: "12:30", building: "GDC", room: "6.202", seats: 60, enrolled: 58, rating: 4.9, mode: "In Person" },
      { unique: 56905, instructor: "Maggie Tate", days: "MWF", start: "13:00", end: "14:00", building: "SEA", room: "2.108", seats: 72, enrolled: 47, rating: 4.1, mode: "In Person" }
    ]
  },
  {
    id: "CS311",
    dept: "CS",
    number: "311",
    title: "Discrete Mathematics",
    credits: 3,
    sections: [
      { unique: 51200, instructor: "Mia Minnes", days: "MWF", start: "09:00", end: "10:00", building: "GDC", room: "1.304", seats: 180, enrolled: 171, rating: 4.4, mode: "In Person" },
      { unique: 51205, instructor: "Yuli Ye", days: "TTH", start: "15:30", end: "17:00", building: "GDC", room: "2.216", seats: 120, enrolled: 75, rating: 4.2, mode: "In Person" }
    ]
  },
  {
    id: "CS314",
    dept: "CS",
    number: "314",
    title: "Data Structures",
    credits: 3,
    sections: [
      { unique: 51230, instructor: "Mike Scott", days: "TTH", start: "09:30", end: "11:00", building: "GDC", room: "2.216", seats: 150, enrolled: 144, rating: 4.7, mode: "In Person" },
      { unique: 51235, instructor: "Calvin Lin", days: "MWF", start: "12:00", end: "13:00", building: "GDC", room: "5.302", seats: 150, enrolled: 101, rating: 4.5, mode: "In Person" },
      { unique: 51240, instructor: "Staff", days: "TTH", start: "14:00", end: "15:30", building: "ETC", room: "2.102", seats: 180, enrolled: 94, rating: 3.5, mode: "In Person" }
    ]
  },
  {
    id: "CS329E",
    dept: "CS",
    number: "329E",
    title: "Elements of Data Analytics",
    credits: 3,
    sections: [
      { unique: 51320, instructor: "Kathleen Powell", days: "MWF", start: "10:00", end: "11:00", building: "UTC", room: "3.110", seats: 160, enrolled: 122, rating: 4.0, mode: "In Person" },
      { unique: 51325, instructor: "John Smith", days: "TTH", start: "12:30", end: "14:00", building: "CBA", room: "4.328", seats: 90, enrolled: 52, rating: 4.1, mode: "In Person" }
    ]
  },
  {
    id: "CS331",
    dept: "CS",
    number: "331",
    title: "Algorithms and Complexity",
    credits: 3,
    sections: [
      { unique: 51360, instructor: "David Zimand", days: "MWF", start: "11:00", end: "12:00", building: "GDC", room: "1.304", seats: 120, enrolled: 109, rating: 4.3, mode: "In Person" },
      { unique: 51365, instructor: "Adnan Aziz", days: "TTH", start: "14:00", end: "15:30", building: "GDC", room: "5.302", seats: 90, enrolled: 87, rating: 4.8, mode: "In Person" },
      { unique: 51370, instructor: "Staff", days: "MWF", start: "15:00", end: "16:00", building: "RLM", room: "4.102", seats: 130, enrolled: 73, rating: 3.7, mode: "In Person" }
    ]
  },
  {
    id: "CS340D",
    dept: "CS",
    number: "340D",
    title: "Digital Logic Design",
    credits: 3,
    sections: [
      { unique: 51410, instructor: "Mohan Kumar", days: "TTH", start: "08:00", end: "09:30", building: "ETC", room: "2.136", seats: 96, enrolled: 64, rating: 4.1, mode: "In Person" },
      { unique: 51415, instructor: "William Aiello", days: "MWF", start: "13:00", end: "14:00", building: "ETC", room: "1.120", seats: 96, enrolled: 81, rating: 4.0, mode: "In Person" }
    ]
  },
  {
    id: "M325K",
    dept: "M",
    number: "325K",
    title: "Discrete Mathematics",
    credits: 3,
    sections: [
      { unique: 54410, instructor: "Anna Kazanova", days: "MWF", start: "09:00", end: "10:00", building: "RLM", room: "4.102", seats: 140, enrolled: 130, rating: 4.2, mode: "In Person" },
      { unique: 54415, instructor: "Diana Thomas", days: "TTH", start: "12:30", end: "14:00", building: "WEL", room: "2.246", seats: 100, enrolled: 68, rating: 4.5, mode: "In Person" }
    ]
  },
  {
    id: "M362K",
    dept: "M",
    number: "362K",
    title: "Probability I",
    credits: 3,
    sections: [
      { unique: 54400, instructor: "Sean Paul", days: "MWF", start: "12:00", end: "13:00", building: "WEL", room: "3.502", seats: 130, enrolled: 108, rating: 4.4, mode: "In Person" },
      { unique: 54405, instructor: "Shannon Starr", days: "TTH", start: "15:30", end: "17:00", building: "RLM", room: "5.120", seats: 110, enrolled: 77, rating: 4.1, mode: "In Person" },
      { unique: 54408, instructor: "Staff", days: "MWF", start: "10:00", end: "11:00", building: "PAR", room: "1", seats: 140, enrolled: 69, rating: 3.5, mode: "In Person" }
    ]
  },
  {
    id: "M408D",
    dept: "M",
    number: "408D",
    title: "Sequences, Series, and Multivariable Calculus",
    credits: 4,
    sections: [
      { unique: 54430, instructor: "Holly Hester", days: "MWF", start: "11:00", end: "12:00", building: "WEL", room: "1.308", seats: 180, enrolled: 165, rating: 4.0, mode: "In Person" },
      { unique: 54435, instructor: "Robert Smith", days: "TTH", start: "09:30", end: "11:00", building: "PAR", room: "104", seats: 120, enrolled: 78, rating: 3.9, mode: "In Person" }
    ]
  },
  {
    id: "ECO304K",
    dept: "ECO",
    number: "304K",
    title: "Introduction to Microeconomics",
    credits: 3,
    sections: [
      { unique: 52120, instructor: "Truman Packard", days: "MWF", start: "10:00", end: "11:00", building: "CBA", room: "4.328", seats: 200, enrolled: 168, rating: 4.2, mode: "In Person" },
      { unique: 52125, instructor: "Daniel Hamermesh", days: "TTH", start: "14:00", end: "15:30", building: "UTC", room: "2.112", seats: 140, enrolled: 91, rating: 4.6, mode: "In Person" }
    ]
  },
  {
    id: "FIN357",
    dept: "FIN",
    number: "357",
    title: "Business Finance",
    credits: 3,
    sections: [
      { unique: 53110, instructor: "Laura Starks", days: "TTH", start: "11:00", end: "12:30", building: "CBA", room: "3.202", seats: 110, enrolled: 98, rating: 4.5, mode: "In Person" },
      { unique: 53115, instructor: "Sheridan Titman", days: "MWF", start: "13:00", end: "14:00", building: "UTC", room: "1.104", seats: 140, enrolled: 101, rating: 4.2, mode: "In Person" }
    ]
  },
  {
    id: "MIS301",
    dept: "MIS",
    number: "301",
    title: "Introduction to Information Systems",
    credits: 3,
    sections: [
      { unique: 53300, instructor: "Mike Hasler", days: "MWF", start: "12:00", end: "13:00", building: "CBA", room: "2.324", seats: 180, enrolled: 121, rating: 4.1, mode: "In Person" },
      { unique: 53305, instructor: "Jason Thatcher", days: "TTH", start: "15:30", end: "17:00", building: "UTC", room: "3.132", seats: 120, enrolled: 84, rating: 4.3, mode: "In Person" }
    ]
  },
  {
    id: "GOV310L",
    dept: "GOV",
    number: "310L",
    title: "American Government",
    credits: 3,
    flags: ["Civics"],
    sections: [
      { unique: 57510, instructor: "Daron Shaw", days: "MWF", start: "09:00", end: "10:00", building: "BUR", room: "106", seats: 220, enrolled: 187, rating: 4.3, mode: "In Person" },
      { unique: 57515, instructor: "Sherri Greenberg", days: "TTH", start: "12:30", end: "14:00", building: "GAR", room: "0.102", seats: 140, enrolled: 96, rating: 4.4, mode: "In Person" }
    ]
  },
  {
    id: "PSY301",
    dept: "PSY",
    number: "301",
    title: "Introduction to Psychology",
    credits: 3,
    sections: [
      { unique: 58210, instructor: "Samuel Gosling", days: "MWF", start: "11:00", end: "12:00", building: "SEA", room: "2.204", seats: 180, enrolled: 167, rating: 4.6, mode: "In Person" },
      { unique: 58215, instructor: "Kristin Neff", days: "TTH", start: "14:00", end: "15:30", building: "SZB", room: "1.512", seats: 110, enrolled: 79, rating: 4.7, mode: "In Person" }
    ]
  },
  {
    id: "HIS315K",
    dept: "HIS",
    number: "315K",
    title: "United States History Since 1865",
    credits: 3,
    flags: ["Writing"],
    sections: [
      { unique: 58420, instructor: "Peniel Joseph", days: "MWF", start: "13:00", end: "14:00", building: "GAR", room: "2.124", seats: 180, enrolled: 148, rating: 4.8, mode: "In Person" },
      { unique: 58425, instructor: "Miriam Bodian", days: "TTH", start: "09:30", end: "11:00", building: "WAG", room: "101", seats: 120, enrolled: 73, rating: 4.4, mode: "In Person" }
    ]
  },
  {
    id: "RHE306",
    dept: "RHE",
    number: "306",
    title: "Rhetoric and Writing",
    credits: 3,
    flags: ["Writing"],
    sections: [
      { unique: 57100, instructor: "Jane Rosenzweig", days: "TTH", start: "11:00", end: "12:30", building: "PAR", room: "103", seats: 25, enrolled: 21, rating: 4.6, mode: "In Person" },
      { unique: 57105, instructor: "Alexandra Hidalgo", days: "MWF", start: "10:00", end: "11:00", building: "WCH", room: "1.120", seats: 25, enrolled: 19, rating: 4.7, mode: "In Person" },
      { unique: 57110, instructor: "Staff", days: "TTH", start: "15:30", end: "17:00", building: "WAG", room: "214", seats: 25, enrolled: 12, rating: 3.8, mode: "In Person" }
    ]
  },
  {
    id: "UGS303",
    dept: "UGS",
    number: "303",
    title: "UGS Signature Course",
    credits: 3,
    flags: ["Writing"],
    sections: [
      { unique: 57210, instructor: "Martha Newman", days: "MWF", start: "12:00", end: "13:00", building: "FAC", room: "21", seats: 30, enrolled: 25, rating: 4.5, mode: "In Person" },
      { unique: 57215, instructor: "Karla Kelsey", days: "TTH", start: "09:30", end: "11:00", building: "MEZ", room: "1.208", seats: 30, enrolled: 18, rating: 4.3, mode: "In Person" }
    ]
  },
  {
    id: "PHL301",
    dept: "PHL",
    number: "301",
    title: "Introduction to Philosophy",
    credits: 3,
    sections: [
      { unique: 58610, instructor: "Robert Solomon", days: "MWF", start: "14:00", end: "15:00", building: "WAG", room: "214", seats: 110, enrolled: 89, rating: 4.8, mode: "In Person" },
      { unique: 58615, instructor: "Sahotra Sarkar", days: "TTH", start: "12:30", end: "14:00", building: "SZB", room: "2.204", seats: 80, enrolled: 51, rating: 4.4, mode: "In Person" }
    ]
  }
];
