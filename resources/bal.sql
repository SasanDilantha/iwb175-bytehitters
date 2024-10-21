-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bal_mysql
-- Generation Time: Oct 21, 2024 at 05:36 AM
-- Server version: 9.1.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bal`
--

-- --------------------------------------------------------

--
-- Table structure for table `PowerPlant`
--

CREATE TABLE `PowerPlant` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `ownership` varchar(100) DEFAULT NULL,
  `daily_production_capacity` decimal(10,2) DEFAULT NULL,
  `mail` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PowerPlant`
--

INSERT INTO `PowerPlant` (`id`, `name`, `location`, `ownership`, `daily_production_capacity`, `mail`) VALUES
(6, 'Victoria', 'Theldeniya, Kandy', 'pub', 100.00, 'victoria@ceb.lk'),
(7, 'Randenigala', 'Randenigala', 'pvt', 245.00, 'randenigala@ceb.lk'),
(8, 'Delft', 'Delft Island', 'pvt', 34.00, 'delft@gmail.com'),
(9, 'Rantembe', 'Rantembe', 'pub', 244.00, 'rantembe@ceb.lk');

-- --------------------------------------------------------

--
-- Table structure for table `PowerPlantStatus`
--

CREATE TABLE `PowerPlantStatus` (
  `status` varchar(50) DEFAULT NULL,
  `produce_capacity` decimal(10,2) DEFAULT NULL,
  `plant_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PowerPlantStatus`
--

INSERT INTO `PowerPlantStatus` (`status`, `produce_capacity`, `plant_id`) VALUES
('dct', 0.00, 9),
('pact', 300.00, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Request`
--

CREATE TABLE `Request` (
  `id` int NOT NULL,
  `power_plant_id` int DEFAULT NULL,
  `request_capacity` decimal(10,2) DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Request`
--

INSERT INTO `Request` (`id`, `power_plant_id`, `request_capacity`, `request_date`, `status`) VALUES
(1, 7, 12.00, '2024-10-20', 'Not Approved'),
(3, 8, 234.00, '2024-10-21', 'Approved');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PowerPlant`
--
ALTER TABLE `PowerPlant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PowerPlantStatus`
--
ALTER TABLE `PowerPlantStatus`
  ADD KEY `PowerPlantStatus_ibfk_1` (`plant_id`);

--
-- Indexes for table `Request`
--
ALTER TABLE `Request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `power_plant_id` (`power_plant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `PowerPlant`
--
ALTER TABLE `PowerPlant`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Request`
--
ALTER TABLE `Request`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `PowerPlantStatus`
--
ALTER TABLE `PowerPlantStatus`
  ADD CONSTRAINT `PowerPlantStatus_ibfk_1` FOREIGN KEY (`plant_id`) REFERENCES `PowerPlant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Request`
--
ALTER TABLE `Request`
  ADD CONSTRAINT `Request_ibfk_1` FOREIGN KEY (`power_plant_id`) REFERENCES `PowerPlant` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
