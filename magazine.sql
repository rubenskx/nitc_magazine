-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2023 at 08:38 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magazine`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `article_id` int(11) NOT NULL,
  `author_name` varchar(40) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `avg_rating` float DEFAULT NULL,
  `upload_date` date DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `img` text NOT NULL,
  `tags` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`article_id`, `author_name`, `title`, `content`, `status`, `avg_rating`, `upload_date`, `count`, `img`, `tags`) VALUES
(1, 'Ruben', 'lorem', '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis magni harum quis accusantium fugit, doloribus hic, ullam repellendus cum quos dicta accusamus fugiat perspiciatis, nesciunt officiis ipsa numquam sequi iure!\r\n  Ipsum repellat consequatur magnam vero veritatis hic similique iure quod nemo accusantium unde soluta eveniet impedit illum suscipit iste vitae qui molestias, minus ab! Corporis assumenda commodi consequatur aperiam ullam?', 'waiting', 2.8, '2023-01-01', 5, 'https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', ''),
(4, '21', 'picture', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestiae perspiciatis odit. Possimus quas saepe sit officia laborum asperiores ipsum explicabo expedita maiores iste error, repellat harum consectetur et. Non.\r\nFuga dolores corporis labore voluptate quae at commodi. Quos tempore perspiciatis sint illo laudantium inventore est dolorem earum dolorum? Asperiores deserunt praesentium dicta sapiente, quae natus culpa facere voluptatem adipisci?\r\nFacere asperiores esse distinctio, saepe aperiam accusamus, deleniti nam placeat voluptatem incidunt dolore reiciendis assumenda temporibus debitis voluptatum pariatur ratione? Eum esse at ratione nobis eveniet. Obcaecati, eaque ex. Repudiandae?\r\nExercitationem minima placeat voluptate quo quisquam quis dolorum, autem aliquid, sunt ipsa a sint fugit? Voluptatibus excepturi dolorum aliquid a corporis repellendus eligendi corrupti, facilis laborum ex placeat voluptates blanditiis?\r\nConsequatur expedita quam quod harum, laborum dolore sapiente quos unde tempora nam reiciendis esse? Veniam vel facere, nostrum voluptatum sint distinctio consectetur dolor dignissimos molestiae earum impedit. Cupiditate, voluptas neque!\r\nSoluta eligendi hic velit eius esse suscipit amet libero iusto. Voluptate iure debitis ipsa? Qui nesciunt quos, illo ut molestiae debitis temporibus, illum pariatur quia nostrum consequatur numquam odio consequuntur?\r\nFugiat adipisci cumque at expedita doloremque quaerat facilis hic dolore consequuntur earum consequatur commodi, mollitia nostrum vitae similique deserunt laborum quisquam dolorum quo debitis repellat amet eligendi corrupti. Molestias, impedit?\r\nSapiente earum labore a asperiores enim similique, illum facere aliquid, adipisci architecto ex, dolore quas! Sequi cum, accusantium aspernatur officiis, laboriosam expedita illo facere nobis corrupti harum distinctio cumque totam.\r\nMinima culpa impedit sint totam ad quidem consequuntur aperiam sit voluptatum recusandae architecto, laborum qui temporibus aspernatur explicabo ipsa atque, odio maiores eos nihil? Quasi veniam nisi asperiores voluptas voluptate.\r\nEligendi ullam voluptate rerum debitis earum laudantium at, dolores sit est doloremque saepe tempora provident incidunt sed qui omnis asperiores perferendis laboriosam eius! Debitis architecto ipsum sunt numquam consequatur iusto?', 'unrated', 5, '2023-01-24', 2, 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', ''),
(5, 'space', 'checking space', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid illo quisquam ut nulla necessitatibus quaerat quos, exercitationem dicta incidunt voluptatum iure error commodi vitae odio eligendi suscipit provident? Recusandae, voluptatibus?<br/>Quos nisi ipsa aliquid iusto vitae molestias quaerat deserunt iure expedita autem repellendus esse, accusamus fugiat necessitatibus corporis sunt numquam! Nulla distinctio debitis eos autem laborum? Accusamus fuga nulla vel.\r\nModi itaque tempora ab quae nulla ex necessitatibus cum assumenda error nesciunt reiciendis recusandae optio repellat nam officiis fuga velit, quod expedita, dolorem dicta asperiores! Tenetur reiciendis eum inventore sapiente!\r\nAlias odit suscipit quia in. Corrupti dolore, odit molestiae, numquam pariatur repellat, excepturi laudantium ut laborum natus voluptatem ipsum voluptas autem sunt! Consequatur, minima quis aut eveniet architecto earum hic?\r\nSimilique atque saepe laboriosam nostrum dicta quia vel non accusantium pariatur incidunt totam sequi nobis nihil, numquam quos a perspiciatis fuga obcaecati voluptatibus quas placeat recusandae voluptate? Illo, modi voluptatibus!\r\nConsequuntur blanditiis ratione dolorem, totam assumenda soluta enim a officia pariatur. Dolore provident quidem ab labore praesentium quaerat molestiae itaque sapiente, debitis exercitationem officiis minus in accusamus fugiat consequuntur voluptates!\r\nConsequuntur ut repellat amet exercitationem, inventore molestias similique, reprehenderit necessitatibus et vel obcaecati, officia dignissimos quos molestiae! Adipisci dolore, temporibus odit obcaecati officiis tempore facilis. Dignissimos sapiente ad eligendi sed?\r\nMolestias earum provident vel quod alias aliquam inventore maxime commodi ipsam harum tenetur, saepe tempore dignissimos nesciunt, quisquam quaerat ex iste rem iusto eveniet perferendis culpa explicabo? Sequi, reprehenderit officia?\r\nNon delectus sit quaerat! Voluptas necessitatibus illo recusandae optio quos quisquam, repellat possimus ut, cum doloremque provident repellendus qui maiores molestias, quaerat ipsa? Rem asperiores voluptatibus laborum pariatur saepe molestiae!\r\nMagni eaque, minima dignissimos quae beatae, omnis libero laborum eveniet, dicta perferendis voluptatibus! Maxime, quia commodi. Non, aspernatur. Corrupti ab voluptates animi consequatur, expedita id officia repellendus nulla fugit placeat!', 'unrated', 3.5, '2023-01-24', 2, 'https://images.pexels.com/photos/3944426/pexels-photo-3944426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', ''),
(6, 'spacer', 'spacer', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt modi aut harum quis, saepe nemo delectus accusantium, necessitatibus nobis laboriosam, alias ducimus enim? Accusamus vitae earum perferendis voluptatibus eaque libero.</br></br>Minima animi quasi temporibus reiciendis quidem optio ipsum voluptate, facere a earum, odio, atque amet possimus molestiae dolores beatae sequi deleniti nobis nihil. Voluptatibus perferendis, sequi nisi ea odit fugit.\r\nOptio commodi ratione ipsum quos at ullam, voluptas magnam aliquam reprehenderit, eveniet tenetur deserunt blanditiis excepturi voluptatem praesentium expedita veritatis aspernatur delectus architecto mollitia soluta voluptatum odio? In, laudantium quaerat.\r\nBeatae, labore similique amet nesciunt quo quis quisquam recusandae consequatur, reiciendis ullam pariatur magni dicta nemo dolores placeat dignissimos. Possimus, illum? Quasi consequatur explicabo nemo pariatur magnam ipsum minima atque.\r\nOdio eveniet asperiores a esse exercitationem eius repellendus architecto incidunt aspernatur saepe delectus magnam animi ullam enim voluptas quos suscipit excepturi nam in dolores possimus, sint eaque atque tempora! Sed!', 'unrated', 2, '2023-01-24', 2, 'https://images.pexels.com/photos/3708525/pexels-photo-3708525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `c_date` date DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `reviewer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `content`, `rating`, `c_date`, `article_id`, `reviewer_id`) VALUES
(10, 'this is ok.', 1, '0000-00-00', 1, 3),
(16, 'this is cool', 1, '0000-00-00', 1, 1),
(17, 'this is a test. overall it is good.', 3, '0000-00-00', 6, 3),
(18, 'asdsasd adasda', 3, '0000-00-00', 5, 3),
(19, 'this is testing', 5, '0000-00-00', 4, 3),
(20, 'testing', 5, '0000-00-00', 4, 1),
(21, '4 stars.', 4, '0000-00-00', 5, 1),
(22, 'bad.', 1, '0000-00-00', 6, 1),
(23, 'hello this is my first review!', 5, '0000-00-00', 1, 6),
(24, 'this is a interesting point of view.', 3, '0000-00-00', 1, 4),
(26, 'this is tom , my first review!', 4, '0000-00-00', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `reviewer`
--

CREATE TABLE `reviewer` (
  `reviewer_id` int(11) NOT NULL,
  `username` varchar(40) DEFAULT NULL,
  `login_password` varchar(100) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `post` varchar(40) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviewer`
--

INSERT INTO `reviewer` (`reviewer_id`, `username`, `login_password`, `name`, `dob`, `post`, `img`) VALUES
(1, 'vishnu@nitc.ac.in', '$2b$12$r75r7NhHcwblPE9UYz99MOh8Si7tfhdM4Exl8wBS4nSN7Td.mldIG', 'Vishnu', '2023-01-03', 'reviewer', 'https://images.pexels.com/photos/381228/pexels-photo-381228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(2, 'ruben_b200019cs@nitc.ac.in', '$2b$12$r75r7NhHcwblPE9UYz99MOh8Si7tfhdM4Exl8wBS4nSN7Td.mldIG', 'Ruben', '2023-01-17', 'admin', 'https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(3, 'abhay@nitc.ac.in', '$2b$10$uV1lr/XbtENLSPru/sde7eeUIg/NFZPnQl6M0aJ6JU2xtqvnxt2Qu', 'Abhay', '2023-01-01', 'reviewer', 'https://images.pexels.com/photos/596750/pexels-photo-596750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(4, 'sayooj@nitc.ac.in', '$2b$12$a7JvXvrbmkC6FIqFQwAJA.QNpa88wUXIVq294DR8iAo39tGi55Nn2', 'Sayooj', '2020-03-11', 'reviewer', 'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(5, 'tom@nitc.ac.in', '$2b$10$Ksh863thWXdffFQjUZ5BLO37QpEd/eyPg4bBwv7H7Q.wGkNcg2c0.', 'Tom', '2018-01-29', 'reviewer', 'https://images.pexels.com/photos/5421530/pexels-photo-5421530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(6, 'ruben@nitc.ac.in', '$2b$10$cFTl7qWyS6y14A/3csoXauk7u92nomb93LlE8IB.ELe3dcejDbnTy', 'Ruben', '2010-01-08', 'reviewer', 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`article_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `reviewer_id` (`reviewer_id`);

--
-- Indexes for table `reviewer`
--
ALTER TABLE `reviewer`
  ADD PRIMARY KEY (`reviewer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `reviewer`
--
ALTER TABLE `reviewer`
  MODIFY `reviewer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`reviewer_id`) REFERENCES `reviewer` (`reviewer_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
