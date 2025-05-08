
$(document).ready(function() {
    // Environmental Quiz Game
    let currentQuestion = 1;
    let totalQuestions = 10;
    let score = 0;
    let answered = false;
    
    // Initialize quiz controls
    updateQuizControls();
    
    // Next question button
    $('#quiz-next').on('click', function() {
        if (answered) {
            // Move to next question
            if (currentQuestion < totalQuestions) {
                $('#quiz-question-' + currentQuestion).removeClass('active');
                currentQuestion++;
                $('#quiz-question-' + currentQuestion).addClass('active');
                answered = false;
                updateQuizControls();
            } else {
                // Show results
                $('.quiz-question').removeClass('active');
                $('#quiz-result').show();
                $('.quiz-score').text(score + '/' + totalQuestions);
                
                // Update feedback based on score
                let feedback = '';
                if (score <= 3) {
                    feedback = 'There\'s room for improvement. Keep learning about environmental issues!';
                } else if (score <= 6) {
                    feedback = 'Good job! You have a solid understanding of environmental issues.';
                } else if (score <= 9) {
                    feedback = 'Great work! You\'re well-informed about environmental challenges.';
                } else {
                    feedback = 'Perfect score! You\'re an environmental expert!';
                }
                $('.quiz-feedback').text(feedback);
                
                // Hide controls
                $('.quiz-controls').hide();
            }
        } else {
            // If not answered, show alert
            alert('Please select an answer before proceeding.');
        }
    });
    
    // Previous question button
    $('#quiz-prev').on('click', function() {
        if (currentQuestion > 1) {
            $('#quiz-question-' + currentQuestion).removeClass('active');
            currentQuestion--;
            $('#quiz-question-' + currentQuestion).addClass('active');
            updateQuizControls();
        }
    });
    
    // Restart quiz button
    $('#quiz-restart').on('click', function() {
        // Reset quiz state
        currentQuestion = 1;
        score = 0;
        answered = false;
        
        // Reset UI
        $('.quiz-option').removeClass('selected correct incorrect');
        $('#quiz-result').hide();
        $('#quiz-question-1').addClass('active');
        $('.quiz-controls').show();
        updateQuizControls();
    });
    
    // Handle option selection
    $('.quiz-option').on('click', function() {
        if (!answered) {
            // Mark as answered
            answered = true;
            
            // Get selected option
            const $option = $(this);
            $option.addClass('selected');
            
            // Check if correct
            const isCorrect = $option.data('correct') === true;
            
            // Update UI based on correctness
            if (isCorrect) {
                $option.addClass('correct');
                score++;
            } else {
                $option.addClass('incorrect');
                // Highlight correct answer
                $(this).siblings('[data-correct="true"]').addClass('correct');
            }
            
            // Update button text if last question
            if (currentQuestion === totalQuestions) {
                $('#quiz-next').text('See Results');
            }
        }
    });
    
    // Helper function to update quiz controls
    function updateQuizControls() {
        // Update previous button state
        if (currentQuestion === 1) {
            $('#quiz-prev').addClass('btn-disabled');
        } else {
            $('#quiz-prev').removeClass('btn-disabled');
        }
        
        // Update next button text
        if (currentQuestion === totalQuestions) {
            $('#quiz-next').text('Finish');
        } else {
            $('#quiz-next').text('Next');
        }
    }
    
    // Memory Match Game
    let flippedCards = [];
    let matchedPairs = 0;
    let totalPairs = 4;
    let canFlip = true;
    let moves = 0;
    
    // Shuffle cards
    shuffleCards();
    
    // Card click handler
    $('.memory-card').on('click', function() {
        // Check if card can be flipped
        if (canFlip && !$(this).hasClass('flipped') && !$(this).hasClass('matched')) {
            // Flip card
            $(this).addClass('flipped');
            flippedCards.push($(this));
            
            // Check if two cards are flipped
            if (flippedCards.length === 2) {
                moves++;
                canFlip = false;
                
                // Check if cards match
                if (flippedCards[0].data('pair') === flippedCards[1].data('pair')) {
                    // Cards match
                    flippedCards[0].addClass('matched');
                    flippedCards[1].addClass('matched');
                    flippedCards = [];
                    canFlip = true;
                    matchedPairs++;
                    
                    // Check if game is complete
                    if (matchedPairs === totalPairs) {
                        // Show result
                        $('#memory-result').show();
                        $('#memory-moves').text(moves);
                        
                        // Set star rating based on moves
                        let stars = 3;
                        if (moves > 8) {
                            stars = 2;
                        }
                        if (moves > 12) {
                            stars = 1;
                        }
                        
                        // Update stars display
                        $('#memory-stars').empty();
                        for (let i = 0; i < stars; i++) {
                            $('#memory-stars').append('<i class="fas fa-star"></i> ');
                        }
                    }
                } else {
                    // Cards don't match, flip back after delay
                    setTimeout(function() {
                        flippedCards[0].removeClass('flipped');
                        flippedCards[1].removeClass('flipped');
                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            }
        }
    });
    
    // Restart memory game
    $('#memory-restart').on('click', function() {
        // Reset game state
        flippedCards = [];
        matchedPairs = 0;
        canFlip = true;
        moves = 0;
        
        // Reset UI
        $('.memory-card').removeClass('flipped matched');
        $('#memory-result').hide();
        
        // Shuffle cards
        shuffleCards();
    });
    
    // Helper function to shuffle cards
    function shuffleCards() {
        const cards = $('.memory-card').toArray();
        
        // Fisher-Yates shuffle algorithm
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        // Reappend cards in new order
        $.each(cards, function(i, card) {
            $('.memory-game').append(card);
        });
    }
    
    // Waste Sorting Game
    let correctSorts = 0;
    let incorrectSorts = 0;
    
    // Make items draggable
    $('.waste-item').draggable({
        revert: 'invalid',
        cursor: 'move',
        helper: 'clone',
        start: function(event, ui) {
            $(this).addClass('dragging');
        },
        stop: function(event, ui) {
            $(this).removeClass('dragging');
        }
    });
    
    // Make bins droppable
    $('.waste-bin').droppable({
        accept: '.waste-item',
        hoverClass: 'bin-hover',
        drop: function(event, ui) {
            const binType = $(this).data('bin');
            const itemType = ui.draggable.data('type');
            
            // Check if correct bin
            if (binType === itemType) {
                // Correct sort
                correctSorts++;
                
                // Show success feedback
                $(this).addClass('correct-drop');
                setTimeout(() => {
                    $(this).removeClass('correct-drop');
                }, 500);
                
                // Remove the sorted item
                ui.draggable.fadeOut(300, function() {
                    $(this).remove();
                    
                    // Check if all items sorted
                    if ($('.waste-item').length === 0) {
                        // Game complete
                        showSortingResults();
                    }
                });
            } else {
                // Incorrect sort
                incorrectSorts++;
                
                // Show error feedback
                $(this).addClass('incorrect-drop');
                setTimeout(() => {
                    $(this).removeClass('incorrect-drop');
                }, 500);
                
                // Shake the item
                ui.draggable.effect('shake', { times: 2, distance: 5 }, 300);
            }
            
            // Update score
            $('#correct-sorts').text(correctSorts);
            $('#incorrect-sorts').text(incorrectSorts);
        }
    });
    
    // Reset sorting game
    $('#sorting-restart').on('click', function() {
        // Reset game state
        correctSorts = 0;
        incorrectSorts = 0;
        
        // Reset UI
        $('#correct-sorts').text('0');
        $('#incorrect-sorts').text('0');
        $('#sorting-result').hide();
        
        // Restore items
        $('.waste-items').empty();
        
        const wasteItems = [
            { name: 'Plastic Bottle', type: 'recycle', icon: 'fa-bottle-water' },
            { name: 'Banana Peel', type: 'compost', icon: 'fa-apple-whole' },
            { name: 'Glass Jar', type: 'recycle', icon: 'fa-jar' },
            { name: 'Used Tissue', type: 'trash', icon: 'fa-toilet-paper' },
            { name: 'Aluminum Can', type: 'recycle', icon: 'fa-database' },
            { name: 'Coffee Grounds', type: 'compost', icon: 'fa-mug-hot' },
            { name: 'Plastic Bag', type: 'trash', icon: 'fa-bag-shopping' },
            { name: 'Newspaper', type: 'recycle', icon: 'fa-newspaper' },
            { name: 'Egg Shells', type: 'compost', icon: 'fa-egg' }
        ];
        
        // Shuffle items
        for (let i = wasteItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wasteItems[i], wasteItems[j]] = [wasteItems[j], wasteItems[i]];
        }
        
        // Add items to container
        wasteItems.forEach(item => {
            const itemElement = $('<div class="waste-item" data-type="' + item.type + '">' +
                '<i class="fas ' + item.icon + '"></i>' +
                '<span>' + item.name + '</span>' +
            '</div>');
            
            $('.waste-items').append(itemElement);
            
            // Make new items draggable
            itemElement.draggable({
                revert: 'invalid',
                cursor: 'move',
                helper: 'clone',
                start: function(event, ui) {
                    $(this).addClass('dragging');
                },
                stop: function(event, ui) {
                    $(this).removeClass('dragging');
                }
            });
        });
    });
    
    // Initialize sorting game
    $('#sorting-restart').trigger('click');
    
    // Show sorting results
    function showSortingResults() {
        const totalSorts = correctSorts + incorrectSorts;
        const accuracy = Math.round((correctSorts / totalSorts) * 100);
        
        $('#sorting-accuracy').text(accuracy + '%');
        
        let message = '';
        if (accuracy >= 90) {
            message = 'Excellent! You\'re a waste sorting expert!';
        } else if (accuracy >= 70) {
            message = 'Good job! You\'re getting the hang of proper waste sorting.';
        } else {
            message = 'Keep practicing! Proper waste sorting is an important skill.';
        }
        
        $('#sorting-message').text(message);
        $('#sorting-result').show();
    }
});
