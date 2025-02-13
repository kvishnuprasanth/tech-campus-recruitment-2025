Brute Force Approach (Initial Solution)

How it works:
Read the entire log file into memory.
Split the log content into lines and filter out the ones that match the specified date.
Write the filtered logs to an output file.
Time Complexity: O(N) where N is the number of log entries.
Memory Usage: Stores all logs in memory, which can be inefficient for large files.
Drawbacks:
High time complexity when dealing with large log files.
Consumes a lot of memory if the log file is very large.
Streaming Approach

How it works:
Instead of reading the entire file into memory, read the file line-by-line using a stream.
Filter out the logs that match the specified date and write them to an output file.
Time Complexity: O(N), where N is the number of log entries.
Memory Usage: More efficient than brute force since we don't store the entire log file in memory.
Drawbacks:
Still O(N) time complexity for searching, which could be slow for large log files.
The log file still needs to be traversed completely, and we cannot take advantage of date ordering.
Binary Search Approach (Final Solution)

How it works:
Assumption: Log file is sorted chronologically by date (e.g., YYYY-MM-DD).
Use binary search to find the first occurrence of the desired date in the sorted log file.
After locating the starting point, iterate over the logs and extract all entries matching the date.
Time Complexity:
Binary Search: O(log N) to find the first occurrence of the specified date.
Log Extraction: O(M) where M is the number of logs for the specified date.
Overall time complexity: O(log N + M), which is significantly more efficient when M is small.
Memory Usage: Still requires memory for reading the file, but significantly reduces the number of logs that need to be processed by using binary search.
Why Choose the Binary Search Approach?
Efficiency:

When logs are chronologically sorted, using binary search dramatically reduces the time it takes to locate the first log entry for the specified date (from O(N) to O(log N)).
After finding the starting point, extracting logs for that date takes O(M) time, where M is the number of logs for that date.
Better Scalability:

For large log files, the binary search approach performs much better than brute force, especially when M (the number of logs for the given date) is much smaller than N (the total number of logs in the file).
It avoids the memory bottleneck of reading the entire log file into memory at once.
Practical Use Case:

This approach is highly useful in production environments where logs are stored chronologically, and you often need to extract logs for specific dates without reading the entire file into memory.
Final Solution Summary
Steps Involved:

Step 1: Use binary search to locate the first log entry for the specified date in a sorted log file.
Step 2: Once found, iterate through the subsequent logs for that date.
Step 3: Write the extracted logs to an output file for further use.
Time Complexity:

O(log N) for finding the first log entry (using binary search).
O(M) for iterating over the logs of the specified date, where M is the number of logs for that date.
Memory Usage:

Efficient in memory as we only process lines that match the date and do not load the entire file into memory at once.
Steps to Run the Final Solution
1.Fork the repository
2.Working solution is placed in src directory with name extract_logs.js

node extract_logs.js 2024-12-01
This will extract all logs for 2024-12-01 from input file and save them in the output folder.
View the Extracted Logs:

Check the output in the output/output_2024-12-01.txt file.
Conclusion
By using binary search in a sorted log file, the solution is much more efficient for large datasets compared to brute-force or streaming approaches. This method is ideal when you need to quickly search and extract logs by date, especially in production environments with massive log files