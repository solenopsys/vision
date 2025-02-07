## Events

Event processing in the system.

### Control Events
Control events have the highest priority, are processed first, and are transmitted over the network with priority. These events include:
  - Cluster management
  - Data processing management
  - Equipment management

### Log Events
Log events are not routed or transmitted over the network. They are written directly to disk. Log types include:
  - Equipment logs
  - Host and container logs
  - Computational task logs

## Event Size and Format
Each event is limited to 1024 bytes to enable efficient storage and transmission without segmentation in a single IP packet.

Events are transmitted and stored in CAP format. Logs can be compressed using lz4 to optimize storage. They can also consist of multiple data frames.

Each event contains a field at the start of the frame with encoded event time, source, event type, and a unique identifier (16 bytes). This is necessary for fast filtering and retrieval during storage.

## Event UID
The event identifier consists of 16 bytes:
- 6 bytes — time (with microsecond precision)
- 1 byte — event type (Error, Warning, Info, Debug, Trace)
- 4 bytes — event source
- 4 bytes — unique random identifier
- 1 byte — segment number of the event (if it is split into multiple parts)

## Event Log Storage
Events are stored on the same hosts where they occur. Logging is done in real-time in blocks. Event retrieval also happens locally, similar to MapReduce principles.

Log scanning is performed on the host using a file system that operates in memory. Block devices are passed into containers for logging.

Event storage is allocated at the superblock level, with a minimum block size of 256 megabytes. Event blocks are saved sequentially. Each block starts with 64 bits: the first 16 bits indicate data length, and the following 6 bytes record the timestamp.