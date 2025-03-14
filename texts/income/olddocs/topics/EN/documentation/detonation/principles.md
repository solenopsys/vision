### Principles

**Rejecting the integration of heavyweight systems** with their own complex infrastructure in favor of lightweight basic
technologies with customizable user interfaces (UI modules). Examples of heavyweight systems include Gitlab, Grafana,
MAAS, and OpenStack. Reasons for this decision include redundancy (90% of the functionality of these systems is
unnecessary), a high entry threshold for users, complex integration and deployment, a lack of control over internal
infrastructure and the visual interface, and high resource demands.

**Rejecting the integration of applications with their own UI interfaces**. Examples of applications with their own UI
interfaces include Octoprint, Kubernetes Dashboard, Portainer, and Cockpit. You can use any development tools, but they
should **not** be embedded as modules in the Solenopsys platform.

**Ready-made integrations** - creating Converged modules based on existing open-source projects. For example, database
systems like PostgreSQL, Mongo, and others.
