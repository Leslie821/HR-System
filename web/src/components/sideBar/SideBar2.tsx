import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Grid,
} from "@mantine/core";
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
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { IRootState } from "../../store/store";
import { LinksGroup } from "./sideBarSetting";
import { UserButton } from "./sideBarSetting2";
// import { Logo } from "./Logo";

const information = [
  { label: "Dashboard", icon: IconGauge, link: "dashboard" },
  {
    label: "Company",
    icon: IconNotes,
    links: [
      { label: "Department", link: "/departments" },
      { label: "Job Title", link: "/job_title" },
    ],
  },
  {
    label: "Staffs",
    icon: IconCalendarStats,
    // link: "/staff-list",
    links: [
      {
        label: "Staff List",
        link: "/employees",
        icon: IconNotes,
        accessList: [1],
      },
    ],
  },
  {
    label: "Request",
    icon: IconLock,
    links: [
      {
        label: "Leave Request",
        link: "/show_dayoff_application",
        icon: IconNotes,
      },
      { label: "Claim Request", link: "/dashboard", icon: IconNotes },
    ],
  },
  {
    label: "Leave",
    icon: IconLock,
    links: [
      { label: "Leave Application", link: "/apply-day-off", icon: IconNotes },
      { label: "Leave Type", link: "/show_dayoff_type", icon: IconNotes },
      { label: "Reports", link: "/dashboard", icon: IconNotes },
    ],
  },
  {
    label: "Expense Claims",
    icon: IconLock,
    links: [
      { label: "Claims Balance", link: "/dashboard", icon: IconNotes },
      { label: "Claims Application", link: "/dashboard", icon: IconNotes },
      { label: "Reports", link: "/dashboard", icon: IconNotes },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    position: "fixed",
    width: "20vw",
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
  const user = useSelector((state: IRootState) => state.user.user); //access_level_id

  const { classes } = useStyles();
  const links = information.map((item) => (
    <LinksGroup {...(item as any)} key={item.label} />
  ));

  return (
    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
      <Grid.Col span={2}>
        <Navbar width={{ sm: 260 }} p="md" className={classes.navbar}>
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
      </Grid.Col>
      <Grid.Col span={10}>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}
