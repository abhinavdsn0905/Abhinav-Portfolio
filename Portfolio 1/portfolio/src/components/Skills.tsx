"use client";

import { motion, Variants } from "framer-motion";

const SKILL_GROUPS = [
  {
    label: "Languages",
    color: "#00e5ff",
    skills: ["Python", "C++", "C", "SQL"],
  },
  {
    label: "Web Technologies",
    color: "#a855f7",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    label: "Frameworks & Libraries",
    color: "#22c55e",
    skills: ["Django", "NumPy", "Pandas", "Scikit-learn", "Framer Motion"],
  },
  {
    label: "Tools & DevOps",
    color: "#f97316",
    skills: ["Git", "GitHub", "MySQL", "SQLite", "Tailwind CSS"],
  },
  {
    label: "Soft Skills",
    color: "#facc15",
    skills: ["Time Management", "Analytical Reasoning", "Critical Thinking", "Task Planning"],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            Toolbox
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Skills
          </h2>
          <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>

        {/* Skill groups */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-10"
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div key={group.label} variants={groupVariants}>
              <p
                className="text-xs font-medium tracking-[0.2em] uppercase mb-3"
                style={{ color: group.color }}
              >
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border glass cursor-default transition-colors"
                    style={{
                      borderColor: `${group.color}30`,
                      color: group.color,
                      background: `${group.color}08`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-6 text-center">
            Certifications
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Master Generative AI & Generative AI tools",
                org: "Infosys SpringBoard",
                date: "Aug '25",
              },
              {
                name: "Computer Communications",
                org: "Coursera",
                date: "Nov '24",
              },
              {
                name: "Python",
                org: "CSe_Pathshala",
                date: "Mar '24",
              },
              {
                name: "Responsive Web Design",
                org: "FreeCodeCamp",
                date: "Dec '23",
              },
            ].map(({ name, org, date }) => (
              <div
                key={name}
                className="flex items-start gap-3 p-4 rounded-xl glass border border-white/5"
              >
                <span className="text-accent mt-0.5">✦</span>
                <div>
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-text-secondary text-xs mt-0.5">
                    {org} · {date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-6 text-center">
            Education
          </p>
          <div className="space-y-4">
            {[
              {
                degree: "B.Tech — Computer Science & Engineering (AI & ML)",
                institution: "Lovely Professional University, Phagwara, Punjab",
                grade: "CGPA: 7.64",
                period: "Aug '23 – Present",
              },
              {
                degree: "Intermediate — MPC",
                institution: "Narayana Junior College, Proddatur",
                grade: "95.8%",
                period: "Sep '21 – Mar '23",
              },
              {
                degree: "Matriculation",
                institution: "Gautam High School, Proddatur",
                grade: "100%",
                period: "Jun '20 – May '21",
              },
            ].map(({ degree, institution, grade, period }) => (
              <div
                key={degree}
                className="p-5 rounded-xl glass border border-white/5 group hover:border-accent/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <p className="text-white font-medium text-sm">{degree}</p>
                    <p className="text-text-secondary text-xs mt-1">
                      {institution}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent text-sm font-semibold whitespace-nowrap">
                      {grade}
                    </p>
                    <p className="text-text-secondary text-xs mt-1 whitespace-nowrap">
                      {period}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
