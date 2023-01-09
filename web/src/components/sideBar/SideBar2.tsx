import { Navbar, Group, Code, ScrollArea, createStyles } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconAssembly,
} from "@tabler/icons";
import { LinksGroup } from "./sideBarSetting";
import { UserButton } from "./sideBarSetting2";
// import { Logo } from "./Logo";

const information = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "Company",
    icon: IconNotes,
    links: [
      { label: "Department", link: "/" },
      { label: "Job Title", link: "/" },
    ],
  },
  {
    label: "Staffs",
    icon: IconCalendarStats,
  },
  {
    label: "Request",
    icon: IconLock,
    links: [
      { label: "Leave Request", link: "/", icon: IconNotes },
      { label: "Claim Request", link: "/", icon: IconNotes },
    ],
  },
  {
    label: "Leave",
    icon: IconLock,
    links: [
      { label: "Leave Balance", link: "/", icon: IconNotes },
      { label: "Leave Application", link: "/", icon: IconNotes },
      { label: "Reports", link: "/", icon: IconNotes },
    ],
  },
  {
    label: "Expense Claims",
    icon: IconLock,
    links: [
      { label: "Claims Balance", link: "/", icon: IconNotes },
      { label: "Claims Application", link: "/", icon: IconNotes },
      { label: "Reports", link: "/", icon: IconNotes },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function NavbarNested() {
  const { classes } = useStyles();
  const links = information.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="left">
          <IconAssembly size="45px"></IconAssembly>
          <h2>Dashboard</h2>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Navbar.Section>
    </Navbar>
  );
}
