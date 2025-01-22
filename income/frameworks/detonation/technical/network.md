
### Network

The network encompasses all cluster network resources, facilitating data transfer, traffic routing, and load balancing between servers.

### Tools Used

- **XDP (eXpress Data Path)** — a technology for high-performance packet processing at the Linux kernel level.
- **eBPF (extended Berkeley Packet Filter)** — used in combination with XDP for writing programs that process network packets, filter traffic, and monitor load in real-time. This helps prevent packet loss and increases data transmission speed.
- **io_uring** — optimizes the transmission of multiple data streams by minimizing system calls and context switches between user space and the kernel. For example, when 100 containers are transmitting data simultaneously, io_uring allows data to be sent in blocks with a single system call, enhancing efficiency.

### Event Transmission

The system architecture is optimized for minimal latency in event transmission. In a 10-gigabit network, the latency through a switch is only 10 microseconds, which is significantly faster than in traditional Kubernetes clusters. Event transmission within a host is less than 1 microsecond.

#### How This Is Achieved

- Within hosts, standard network interfaces are not used. Instead, data is transferred with delays of just a few dozen nanoseconds using **POSIX Shared Memory**.

Each host utilizes a process called **Ignite**, which links all containers through POSIX Shared Memory and manages data transfer through network interfaces.

In the routers, the **Ignite** process is also present, controlling both hardware and network traffic. It ensures efficient data routing and manages network interfaces, using plugins for precise traffic control and load balancing.